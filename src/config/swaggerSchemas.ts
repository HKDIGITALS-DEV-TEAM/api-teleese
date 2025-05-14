import { FastifySchema } from 'fastify';

export const UserRoleSchema = {
    $id: 'userRole',
    type: 'object',
    required: ['name'],
    properties: {
        name: { type: 'string', description: 'Role name' },
    },
};

export const UserLoginSchema = {
    $id: 'userLogin',
    type: 'object',
    required: ['identifier', 'password'],
    properties: {
        identifier: { type: 'string', description: 'user id' },
        password: { type: 'string', description: 'user password' },
    },
};

export const CompanyRoleSchema = {
    $id: 'companyRole',
    type: 'object',
    required: ['company', 'role', 'user'],
    properties: {
        user: { type: 'string', description: 'user id' },
        company: { type: 'string', description: 'company id' },
        role: { type: 'string', description: 'Role name' },
    },
};

export const RegisterRequestSchema = {
    $id: 'RegisterRequest',
    type: 'object',
    required: ['username', 'email', 'password', 'firstName', 'lastName'],
    properties: {
        username: { type: 'string', description: 'username' },
        email: { type: 'string', format: 'email', description: 'valid email' },
        password: { type: 'string', minLength: 6, description: 'secure password' },
        firstName: { type: 'string', description: 'user first name' },
        lastName: { type: 'string', description: 'user last name' },
    },
};

export const authSchemas = {
    register: {
        type: 'object',
        summary: 'User registration',
        description: 'sign up using user information',
        tags: ['Auth'],
        body: { $ref: 'RegisterRequest#' },
        response: {
            201: {
                type: 'object',
                properties: {
                    username: { type: 'string', description: 'uniq username' },
                    email: { type: 'string', format: 'email', description: 'valid email address' },
                    password: { type: 'string', description: 'secure password' },
                    firstName: { type: 'string', description: 'user first name' },
                    lastName: { type: 'string', description: 'user last name' },
                    emailVerified: { type: 'boolean', description: 'email verifiation status' },
                    roles: {
                        type: 'array',
                        items: { $ref: 'userRole#' },
                        description: 'list of user roles',
                    },
                    companyRoles: {
                        type: 'array',
                        items: { $ref: 'companyRole#' },
                        description: 'list of user company roles',
                    },
                },
            },
        },
    } as FastifySchema,

    login: {
        type: 'object',
        summary: 'User login',
        description: 'Login using identifier and password',
        tags: ['Auth'],
        body: { $ref: 'userLogin#' },
        response: {
            200: {
                type: 'object',
                properties: {
                    accessToken: { type: 'string' },
                    refreshToken: { type: 'string' },
                },
            },
        },
    } as FastifySchema,
};
