/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserInnerControllerService {

    /**
     * getByAK
     * @param ak ak
     * @returns User OK
     * @throws ApiError
     */
    public static getByAkUsingGet(
ak: string,
): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/inner/ak',
            query: {
                'ak': ak,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getById
     * @param userId userId
     * @returns User OK
     * @throws ApiError
     */
    public static getByIdUsingGet(
userId: number,
): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/inner/id',
            query: {
                'userId': userId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listByIds
     * @param idList idList
     * @returns User OK
     * @throws ApiError
     */
    public static listByIdsUsingGet(
idList: Array<number>,
): CancelablePromise<Array<User>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/inner/ids',
            query: {
                'idList': idList,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
