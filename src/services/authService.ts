import { coreApiService } from "./coreApiService";

export async function retrieveUserById(userId: string) {
    if (userId == null) {
        return null;
    }

    try {
        const { data } = await coreApiService.userService.getUserById(userId);
        return data;
    } catch (e) {
        if (e && e.response && e.response.status === 401) {
            return null;
        }
        throw e;
    }
}

/**
 * Check if User has required permissions. Flat routePermissions array indicates all are required, array of arrays indicate at least one set of permissions must be satisfied.
 * 
 * @param {string[]} userPermissions - Permissions the user possesses 
 * @param {string[]|string[][]} routePermissions - List of Cumulative required permissions or List of Possible required permission sets
 */
export function userHasRequiredPermissions(userPermissions: string[], requiredPermissions: string[]): boolean;
export function userHasRequiredPermissions(userPermissions: string[], requiredPermissions: string[][]): string;
export function userHasRequiredPermissions(userPermissions: string[], requiredPermissions: string[] | string[][]): boolean;
export function userHasRequiredPermissions(userPermissions: string[], requiredPermissions: any) {
    if (typeof requiredPermissions[0] === 'object') {
        //* list of multiple lists of permisison
        //* Example: [[permA, permB], [permC]]
        //* means permA & permB are required, OR permC is required

        const hasPerm = !!requiredPermissions.find((permList: string[]) => permList.every((val: string) => userPermissions.includes(val)))
        return hasPerm;
    }
    return requiredPermissions.every((val: string) => userPermissions.includes(val));
}

