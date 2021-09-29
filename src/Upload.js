import React, { useEffect, useState } from 'react';
import { Alert, message, Button, Space, Typography } from 'antd';

const { Title } = Typography;

export const Upload = () => {
	const [files, setFiles] = useState('');

	useEffect(() => {
		let content = localStorage.getItem('JSON');
		content && setFiles(JSON.parse(content));
		// message.success("Nous avons sauvegardé votre travail");
	}, [files]);

	const handleChange = (e) => {
		const fileReader = new FileReader();
		fileReader.readAsText(e.target.files[0], 'UTF-8');

		fileReader.onload = (e) => {
			console.log(e.target);
			setFiles(e.target.result);
		};
	};

	const onQuite = () => {
		localStorage.removeItem('JSON');
		setFiles('');
		message.error('Effacé!');
	};
	const onSave = () => {
		localStorage.setItem('JSON', JSON.stringify(files));
		message.success('Enregistré!');
	};

	const onClose = (e) => {};
	return (
		<>
			{!navigator.onLine && (
				<Alert
					message="Vous n'êtes pas connecté à Internet"
					description='Pas de panique, vous pouvez travaillez comme si vous étiez en ligne :)'
					type='warning'
					closable
					onClose={onClose}
					showIcon
				/>
			)}

			<Title style={{ backgroundColor: '#40a9ff' }} className='title' level={2}>
				Upload Json file - Example
			</Title>
			<label className='custom-file-upload'>
				<input type='file' onChange={(e) => handleChange(e)} />
				Upload JSON
			</label>
			<br />
			<br />

			{files && (
				<>
					<textarea
						rows='5'
						cols='33'
						style={{ width: '500px', height: '420px' }}
						value={files}
						readOnly
					>
						{files}
					</textarea>
					<br />
					<Space direction='horizontal'>
						<Button type='primary' onClick={onSave}>
							Enregistrer
						</Button>
						<Button type='danger' onClick={(e) => onQuite()}>
							Non, je quitte
						</Button>
					</Space>
				</>
			)}
		</>
	);
};
