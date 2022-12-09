export enum AUTH {
  AUTHORIZATION = 'Authorization'
}
export enum Role {
  User = 'user',
  Admin = 'admin'
}

export enum RESPONSE_MESSAGE {
  SUCCESS = 'Success',
  NOT_FOUND = 'Api Not Found',
  UNAUTHORIZED_USER = 'Unauthorized User',
  SERVER_ERROR = 'Internal Server Error'
}

export enum OPERATION_TYPE {
  LOG_IN = 'USER LOG IN',
  NEW_USER = 'REGISTER NEW USER',
  GET_USER_PENDING_QUIZ = 'GET ALL PENDING OF USER QUIZ',
  GET_USER_COMPLETED_QUIZ = 'GET ALL COMPLETED OF USER QUIZ',
  ALL_USERS = 'GET ALL USERS',
  USER_BY_ID = 'GET USER BY ID',
  UPDATE_USER = 'UPDATE USER DETAILS',
  DELETE_USER = 'DELETE USER',
  NEW_QUIZ = 'CREATE NEW QUIZ',
  QUIZ_BY_ID = 'GET QUIZ BY ID',
  ALL_QUIZ = 'GET ALL QUIZ',
  DELETE_QUIZ = 'DELETE QUIZ',
  UPDATE_QUIZ = 'UPDATE QUIZ',
  NEW_QUESTION = 'CREATE NEW QUESTION',
  ALL_QUESTIONS = 'GET ALL QUESTIONS',
  QUESTION_BY_ID = 'GET QUESTION BY ID',
  UPDATE_QUESTION = 'UPDATE QUESTION',
  DELETE_QUESTION = 'DELETE QUESTION',
  REVIEW_QUESTIONS = 'REVIEW QUESTIONS',
  MIGRATE_QUESTIONS = 'MIGRATE QUESTIONS',
  FIND_ALL_QUESTIONS = 'FIND ALL QUESTIONS',
  REVIEW_QUESTION = 'REVIEW QUESTION',
  ADMIN_LOG_IN = 'ADMIN LOG IN',
  ADMIN_BY_ID = 'GET ADMIN BY ID',
  UPDATE_ADMIN = 'UPDATE ADMIN DETAILS'
}

export enum API_TAG {
  ADMIN_AUTH = 'Admin Authentication',
  ADMIN = 'Admin Operations',
  PUBLIC_QUESTIONS = 'Public Questions',
  USERS_CRUD = 'Users CRUD',
  USER_AUTHENTICATION = 'User Authentication',
  ADMIN_DASHBOARD = 'Admin Dashboard'
}

export enum CONTROLLER_DEF {
  PUBLIC_QUESTIONS = 'public-questions',
  USERS_SERVICES = 'users',
  ADMIN_AUTH = 'admin-auth',
  AUTH_SERVICES = 'auth',
  ADMIN_DASHBOARD = 'admin/dashboard'
}

export enum ERROR_MESSAGE {
  LOGIN_FAILED = 'Login failed',
  WRONG_PASSWORD = 'Wrong Password',
  USER_NOT_FOUND = 'No user found of this email',
  USER_BLOCKED = 'Your account has been blocked please contact to admin',
  INVALID_TOKEN = 'Invalid user/token'
}

export enum QUIZ_TYPE {
  COMPLETED = 'Completed',
  TERMINATED = 'Terminated',
  PENDING = 'Pending'
}

export enum COLLECTION_NAME {
  USERS = 'users'
}

export enum VARIABLES {
  USER_EMAIL = 'email',
  EMAIL = 'email',
  QUESTIONS = 'questions',
  USER_DETAILS = 'userDetails'
}

export enum EMAIL_SUBJECT {
  QUIZ = 'Quiz Assignment',
  RESET_PASSWORD = 'Reset your password'
}