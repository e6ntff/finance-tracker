import React, { useCallback, useMemo, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import paths from '../settings/paths';
import { userStore } from 'utils/userStore';
import { observer } from 'mobx-react-lite';
import languages from 'settings/languages';
import { Button, Flex, Form, Input, Typography } from 'antd';
import { AuthUser } from 'settings/interfaces';
import Link from 'antd/es/typography/Link';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

const auth = getAuth(firebaseApp);

const LogIn: React.FC = observer(() => {
	const navigate = useNavigate();
	const { language, setLogged } = userStore;

	const [incorrect, setIncorrect] = useState<boolean>(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	const [fields, setFields] = useState({
		email: true,
		password: true,
	});

	const [currentUser, setCurrentUser] = useState<AuthUser>({
		email: '',
		password: '',
	});

	const valid: boolean = useMemo(() => {
		for (const field of Object.values(fields)) {
			if (!field) return false;
		}
		return true;
	}, [fields]);

	const handleEmailChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { value, validity } = event.target;
			setIncorrect(false);
			setCurrentUser((prevUser: AuthUser) => ({ ...prevUser, email: value }));
			setFields((prevFields) => ({ ...prevFields, email: validity.valid }));
		},
		[setIncorrect, setCurrentUser, setFields]
	);

	const handlePasswordChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target;
			setIncorrect(false);
			setCurrentUser((prevUser: AuthUser) => ({
				...prevUser,
				password: value,
			}));
			setFields((prevFields) => ({
				...prevFields,
				password: value.length >= 6 && value.length <= 16,
			}));
		},
		[setIncorrect, setCurrentUser, setFields]
	);

	const logIn = useCallback(async () => {
		try {
			await signInWithEmailAndPassword(
				auth,
				currentUser.email,
				currentUser.password
			);
			navigate('/');
			setLogged(true);
		} catch (error: any) {
			setIncorrect(true);
		}
	}, [
		setIncorrect,
		navigate,
		currentUser.email,
		currentUser.password,
		setLogged,
	]);

	const goToSignIn = useCallback(() => {
		navigate(paths.register);
	}, [navigate]);

	const handlePasswordVisibilityChange = () => {
		setIsPasswordVisible((prev: boolean) => !prev);
	};

	return (
		<Form
			layout='vertical'
			labelCol={{
				span: 26,
			}}
			wrapperCol={{
				span: 26,
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
					type={isPasswordVisible ? 'text' : 'password'}
					value={currentUser.password}
					onChange={handlePasswordChange}
					suffix={
						isPasswordVisible ? (
							<EyeOutlined
								style={{ opacity: 0.5 }}
								onClick={handlePasswordVisibilityChange}
							/>
						) : (
							<EyeInvisibleOutlined
								style={{ opacity: 0.5 }}
								onClick={handlePasswordVisibilityChange}
							/>
						)
					}
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
				<Flex
					align='center'
					gap={16}
				>
					<Button
						disabled={!valid}
						onClick={logIn}
					>
						{languages.logIn[language]}
					</Button>
					<Link onClick={goToSignIn}>{languages.yet[language]}</Link>
				</Flex>
			</Flex>
		</Form>
	);
});

export default LogIn;
