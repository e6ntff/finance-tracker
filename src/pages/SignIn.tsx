import React, { useCallback, useMemo, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import paths from '../settings/paths';
import { userStore } from 'utils/userStore';
import { observer } from 'mobx-react-lite';
import languages from 'settings/languages';
import Link from 'antd/es/typography/Link';
import { Button, Flex, Form, Input, Typography } from 'antd';
import { AuthUser } from 'settings/interfaces';

const auth = getAuth(firebaseApp);

const Register: React.FC = observer(() => {
	const navigate = useNavigate();

	const { language, setLogged } = userStore;

	const [incorrect, setIncorrect] = useState<boolean>(false);

	const [fields, setFields] = useState({
		email: false,
		password: false,
		passwordAgain: false,
	});

	const [currentUser, setCurrentUser] = useState<AuthUser>({
		email: '',
		password: '',
		passwordAgain: '',
	});

	const valid: boolean = useMemo(() => {
		for (const field of Object.values(fields)) {
			if (!field) return false;
		}
		if (currentUser.password !== currentUser.passwordAgain) return false;
		return true;
	}, [fields, currentUser.password, currentUser.passwordAgain]);

	const handleEmailChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { value, validity } = event.target;
			setIncorrect(false);
			setCurrentUser((prevUser: AuthUser) => ({ ...prevUser, email: value }));
			setFields((prevFields) => ({ ...prevFields, email: validity.valid }));
		},
		[setIncorrect, setCurrentUser, setFields, currentUser]
	);

	const handlePasswordChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>, again?: boolean) => {
			const { value } = event.target;
			setIncorrect(false);
			setCurrentUser((prevUser: AuthUser) => ({
				...prevUser,
				[again ? 'passwordAgain' : 'password']: value,
			}));
			setFields((prevFields) => ({
				...prevFields,
				[again ? 'passwordAgain' : 'password']:
					value.length >= 6 && value.length <= 16,
			}));
		},
		[setIncorrect, setCurrentUser, setFields]
	);

	const signIn = useCallback(async () => {
		try {
			await createUserWithEmailAndPassword(
				auth,
				currentUser.email,
				currentUser.password
			);
			navigate('/');
			setLogged(true)
		} catch (error: any) {
			setIncorrect(true);
		}
	}, [currentUser, navigate]);

	const goToLogIn = useCallback(() => {
		navigate(paths.login);
	}, [navigate]);

	return (
		<Form
			layout='vertical'
			labelCol={{
				span: 4,
			}}
			wrapperCol={{
				span: 14,
			}}
		>
			<Form.Item label={languages.email[language]}>
				<Input
					required
					pattern='^[^\s@]+@[^\s@]+\.[^\s@]+$'
					type='text'
					value={currentUser.email}
					onChange={handleEmailChange}
				/>
			</Form.Item>
			<Form.Item label={languages.password[language]}>
				<Input
					required
					type='password'
					value={currentUser.password}
					onChange={handlePasswordChange}
				/>
			</Form.Item>
			<Form.Item label={languages.repeatPassword[language]}>
				<Input
					required
					type='password'
					value={currentUser.passwordAgain}
					onChange={(event) => handlePasswordChange(event, true)}
				/>
			</Form.Item>
			<Flex
				vertical
				gap={16}
			>
				{incorrect && (
					<Typography.Text type='danger'>
						{languages.invalidLogin[language]}
					</Typography.Text>
				)}
				{currentUser.password !== currentUser.passwordAgain && (
					<Typography.Text type='danger'>
						{languages.passMatch[language]}
					</Typography.Text>
				)}
				<Flex
					align='center'
					gap={16}
				>
					<Button
						disabled={!valid}
						onClick={signIn}
					>
						{languages.signIn[language]}
					</Button>
					<Link onClick={goToLogIn}>{languages.already[language]}</Link>
				</Flex>
			</Flex>
		</Form>
	);
});

export default Register;
