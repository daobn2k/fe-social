/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from './firebase';

export const uploadFileToFirebase = (file: any): Promise<string> => {
	return new Promise((resolve, reject) => {
		if (!file) return reject('No file provided');

		const storageRef = ref(storage, `files/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			'state_changed',
			(snapshot: { bytesTransferred: number; totalBytes: number }) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);

				console.log(progress, 'progress');
			},
			(error: any) => {
				reject(error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref)
					.then((downloadURL: any) => {
						resolve(downloadURL);
					})
					.catch((error: any) => {
						reject(error);
					});
			}
		);
	});
};

export const getMediaType = (url: any) => {
	const extension = url && url.split('.').pop().split('?')[0].toLowerCase();
	if (['mp4', 'mov', 'avi', 'wmv', 'flv', 'mkv'].includes(extension)) {
		return 'video';
	} else if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension)) {
		return 'image';
	} else {
		return 'unknown';
	}
};
