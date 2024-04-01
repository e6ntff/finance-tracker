import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useState } from 'react';

interface Props {
	image: string | undefined;
	onChange: (arg0: string) => void;
}

const ImageUpload: React.FC<Props> = observer(({ onChange, image }) => {
	const [loading, setLoading] = useState<boolean>(false);

	const getBase64 = (img: any, callback: any) => {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	};

	const handleChange = useCallback(
		(info: any) => {
			if (info.file.status === 'uploading') {
				setLoading(true);
			}
			if (info.file.status === 'done') {
				getBase64(info.file.originFileObj, (url: any) => {
					setLoading(false);
					onChange(url);
				});
			}
		},
		[setLoading, onChange]
	);

	return (
		<ImgCrop
			cropShape='round'
			rotationSlider
		>
			<Upload
				action={'1'}
				accept='image/*'
				listType='picture-circle'
				showUploadList={false}
				onChange={handleChange}
				maxCount={1}
			>
				{image ? (
					<Image
						preview={false}
						src={image}
						style={{
							width: '100%',
							borderRadius: '50px',
						}}
					/>
				) : loading ? (
					<LoadingOutlined style={{ scale: '1.5' }} />
				) : (
					<PlusOutlined style={{ scale: '1.5' }} />
				)}
			</Upload>
		</ImgCrop>
	);
});

export default ImageUpload;
