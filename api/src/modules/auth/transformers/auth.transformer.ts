export class AuthTransformer {
    static toResponse(user: any, token?: string) {
        const response: any = {
            user: {
                id: user.id,
                email: user.email,
                createdAt: user.createdAt
            }
        };

        if (token) {
            response.access_token = token;
        }

        return response;
    }
}