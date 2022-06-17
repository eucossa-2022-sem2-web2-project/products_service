/* eslint-disable @typescript-eslint/no-explicit-any */
import createDirectory from './createDirectory';
import deleteFile from './deleteFile';
import dirExistAsync from './dirExistAsync';
import dirExistSync from './dirExist';

// import { NODE_ENV } from "@eucossa-web2-product-service-config"

export default Object.freeze({
	dirExistAsync,
	dirExistSync,
	createDirectory,
	deleteFile
});

export {
	dirExistAsync,
	dirExistSync,
	createDirectory,
	deleteFile
};
