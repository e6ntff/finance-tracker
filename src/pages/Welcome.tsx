import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import firebaseApp from '../utils/firebase';
import { userStore } from 'utils/userStore';
import { observer } from 'mobx-react-lite';
import languages from 'settings/languages';
import Link from 'antd/es/typography/Link';
import { Button, Flex, Form, Input, Tooltip, Typography } from 'antd';
import { AuthUser } from 'settings/interfaces';
import {
	EyeInvisibleOutlined,
	EyeOutlined,
	LoginOutlined,
	QuestionCircleOutlined,
	WarningOutlined,
} from '@ant-design/icons';

const auth = getAuth(firebaseApp);

const Welcome: React.FC = observer(() => {
	const { language, setLogged } = userStore;

	const emptyFields = useMemo(
		() => ({
			logIn: {
				email: false,
				password: false,
			},
			signIn: {
				email: false,
				password: false,
				passwordAgain: false,
			},
		}),
		[]
	);

	const emptyUser = useMemo(
		() => ({
			logIn: {
				email: '',
				password: '',
			},
			signIn: {
				email: '',
				password: '',
				passwordAgain: '',
			},
		}),
		[]
	);

	const [mode, setMode] = useState<'logIn' | 'signIn'>('logIn');
	const [incorrect, setIncorrect] = useState<boolean>(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const [fields, setFields] = useState<AuthUser<boolean>>(emptyFields[mode]);
	const [currentUser, setCurrentUser] = useState<AuthUser<string>>(
		emptyUser[mode]
	);

	const valid: boolean = useMemo(() => {
		for (const field of Object.values(fields)) {
			if (!field) return false;
		}
		if (currentUser.password !== currentUser.passwordAgain && mode === 'signIn')
			return false;
		return true;
	}, [fields, currentUser.password, currentUser.passwordAgain, mode]);

	const handleEmailChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { value, validity } = event.target;
			setIncorrect(false);
			setCurrentUser((prevUser: AuthUser<string>) => ({
				...prevUser,
				email: value,
			}));
			setFields((prevFields) => ({ ...prevFields, email: validity.valid }));
		},
		[setIncorrect, setCurrentUser, setFields]
	);

	const handlePasswordChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>, again?: boolean) => {
			const { value } = event.target;
			setIncorrect(false);
			setCurrentUser((prevUser: AuthUser<string>) => ({
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
			setLogged(true);
		} catch (error: any) {
			setIncorrect(true);
		}
	}, [currentUser, setLogged]);

	const logIn = useCallback(async () => {
		try {
			await signInWithEmailAndPassword(
				auth,
				currentUser.email,
				currentUser.password
			);
			setLogged(true);
		} catch (error: any) {
			setIncorrect(true);
		}
	}, [setIncorrect, currentUser.email, currentUser.password, setLogged]);

	const changeMode = useCallback(() => {
		setMode((prevMode: 'logIn' | 'signIn') => {
			const newMode = prevMode === 'logIn' ? 'signIn' : 'logIn';
			setFields(emptyFields[newMode]);
			setCurrentUser(emptyUser[newMode]);
			setIncorrect(false);
			setIsPasswordVisible(false);
			return newMode;
		});
	}, [
		setMode,
		setFields,
		setCurrentUser,
		setIncorrect,
		setIsPasswordVisible,
		emptyFields,
		emptyUser,
	]);

	const handlePasswordVisibilityChange = () => {
		setIsPasswordVisible((prev: boolean) => !prev);
	};

	useEffect(() => {
		const signInInWithEnter = (key: any) => {
			if (key.code === 'Enter' && valid) signIn();
		};

		window.addEventListener('keyup', signInInWithEnter);

		return () => window.removeEventListener('keyup', signInInWithEnter);
	});

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
			<Form.Item
				label={
					<Flex gap={4}>
						{languages.password[language]}
						{mode === 'signIn' && (
							<Tooltip
								title={languages.passwordRequirements[language]}
								placement='right'
							>
								<QuestionCircleOutlined style={{ opacity: 0.5 }} />
							</Tooltip>
						)}
					</Flex>
				}
			>
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
			{mode === 'signIn' && (
				<Form.Item label={languages.repeatPassword[language]}>
					<Input
						required
						type='password'
						value={currentUser.passwordAgain}
						onChange={(event) => handlePasswordChange(event, true)}
					/>
				</Form.Item>
			)}
			<Flex
				vertical
				gap={16}
			>
				{incorrect && (
					<Flex gap={4}>
						<WarningOutlined />
						<Typography.Text type='danger'>
							{languages.invalidLogin[language]}
						</Typography.Text>
					</Flex>
				)}
				{currentUser.password !== currentUser.passwordAgain &&
					mode === 'signIn' && (
						<Flex gap={4}>
							<WarningOutlined />
							<Typography.Text type='danger'>
								{languages.passMatch[language]}
							</Typography.Text>
						</Flex>
					)}
				<Flex
					align='center'
					gap={16}
				>
					<Button
						disabled={!valid}
						onClick={logIn}
					>
						<LoginOutlined />
					</Button>
					<Link onClick={changeMode}>
						{mode === 'logIn'
							? languages.already[language]
							: languages.yet[language]}
					</Link>
				</Flex>
			</Flex>
		</Form>
	);
});

export default Welcome;
