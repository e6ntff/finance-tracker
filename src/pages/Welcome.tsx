import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { app } from '../utils/firebase';
import { userStore } from 'utils/userStore';
import { observer } from 'mobx-react-lite';
import languages from 'settings/languages';
import Link from 'antd/es/typography/Link';
import { Button, Flex, Form, Input, Tooltip, Typography } from 'antd';
import { AuthUser } from 'settings/interfaces';
import {
	LoginOutlined,
	QuestionCircleOutlined,
	WarningOutlined,
} from '@ant-design/icons';
import { optionsStore } from 'utils/optionsStore';

const auth = getAuth(app);

const emptyFields = {
	logIn: {
		email: false,
		password: false,
	},
	signIn: {
		email: false,
		password: false,
		passwordAgain: false,
	},
};

const emptyUser = {
	logIn: {
		email: '',
		password: '',
	},
	signIn: {
		email: '',
		password: '',
		passwordAgain: '',
	},
};

const Welcome: React.FC = observer(() => {
	const { setLogged, setIsNicknameModalOpened } = userStore;
	const { userOptions } = optionsStore;

	const { language } = userOptions;

	const [mode, setMode] = useState<'logIn' | 'signIn'>('logIn');
	const [incorrect, setIncorrect] = useState<boolean>(false);
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
			setIsNicknameModalOpened(true);
		} catch (error: any) {
			setIncorrect(true);
		}
	}, [currentUser, setIsNicknameModalOpened]);

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
			return newMode;
		});
	}, [setMode, setFields, setCurrentUser, setIncorrect]);

	useEffect(() => {
		const signInInWithEnter = (key: any) => {
			if (key.code === 'Enter' && valid) signIn();
		};

		window.addEventListener('keyup', signInInWithEnter);

		return () => window.removeEventListener('keyup', signInInWithEnter);
	});

	const emailInput = useMemo(
		() => (
			<Input
				required
				pattern='^[^\s@]+@[^\s@]+\.[^\s@]+$'
				type='text'
				value={currentUser.email}
				onChange={handleEmailChange}
			/>
		),
		[currentUser.email, handleEmailChange]
	);

	const requirementsTooltip = useMemo(
		() => (
			<Tooltip
				title={languages.passwordRequirements[language]}
				placement='right'
			>
				<QuestionCircleOutlined style={{ opacity: 0.5 }} />
			</Tooltip>
		),
		[language]
	);

	const passwordInput = useCallback(
		(repeat: boolean = false) => {
			const value = repeat ? currentUser.passwordAgain : currentUser.password;

			return (
				<Input.Password
					visibilityToggle={!repeat}
					required
					value={value}
					onChange={(event) => handlePasswordChange(event, repeat)}
				/>
			);
		},
		[currentUser.password, currentUser.passwordAgain, handlePasswordChange]
	);

	const passwordsDoNotMatch = useMemo(
		() => (
			<Flex gap={4}>
				<WarningOutlined />
				<Typography.Text type='danger'>
					{languages.passMatch[language]}
				</Typography.Text>
			</Flex>
		),
		[language]
	);

	const submitButton = useMemo(
		() => (
			<Tooltip
				title={
					mode === 'logIn'
						? languages.logIn[language]
						: languages.signIn[language]
				}
			>
				<Button
					disabled={!valid}
					onClick={mode === 'logIn' ? logIn : signIn}
				>
					<LoginOutlined />
				</Button>
			</Tooltip>
		),
		[language, mode, logIn, signIn, valid]
	);

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
			<Form.Item label={languages.email[language]}>{emailInput}</Form.Item>
			<Form.Item
				label={
					<Flex gap={4}>
						{languages.password[language]}
						{mode === 'signIn' && requirementsTooltip}
					</Flex>
				}
			>
				{passwordInput()}
			</Form.Item>
			{mode === 'signIn' && (
				<Form.Item label={languages.repeatPassword[language]}>
					{passwordInput(true)}
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
					mode === 'signIn' &&
					passwordsDoNotMatch}
				<Flex
					align='center'
					gap={16}
				>
					{submitButton}
					<Link onClick={changeMode}>
						{mode === 'signIn'
							? languages.already[language]
							: languages.yet[language]}
					</Link>
				</Flex>
			</Flex>
		</Form>
	);
});

export default Welcome;
