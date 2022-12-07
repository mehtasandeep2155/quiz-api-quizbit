import { COLLECTION_NAME, QUIZ_TYPE, VARIABLES } from './enums';

export const lookupUsersInQuiz = {
  $lookup: {
    from: COLLECTION_NAME.USERS,
    localField: VARIABLES.USER_EMAIL,
    foreignField: VARIABLES.EMAIL,
    as: VARIABLES.USER_DETAILS
  }
};

export const unwindUserDetail = {
  $unwind: '$userDetails'
};

export const unsetQuizDetails = {
  $unset: [VARIABLES.QUESTIONS, 'userDetails.password']
};

export const completedQuiz = {
  status: QUIZ_TYPE.COMPLETED
};
