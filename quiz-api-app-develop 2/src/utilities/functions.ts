import * as bcrypt from 'bcrypt';
import { difficultyLevel } from './constant';

const saltOrRounds = 10;
/**
@param password
@returns The salt to be used in encryption. If specified as a number then a salt will be generated with the specified number of rounds and used.
 */
export const hashPassword = (password: string) =>
  bcrypt.hashSync(password, saltOrRounds);

/**
@param password
@param hasshedPassword
@returns if matched return true otherwise false
 */
export const comparePassword = (password: string, hashedPassword: string) =>
  bcrypt.compareSync(password, hashedPassword);

/** This function will remove __v from api response */
export function remove_V(doc, ret) {
  delete ret.id;
  delete ret.__v;
  return ret;
}
/** This function will remove __v from api response */
export function removePasword(doc, ret) {
  delete ret.id;
  delete ret.__v;
  delete ret.password
  return ret;
}


/**
@param quizQuestion
@returns Array of object containig category and question of this category
 */
export const makeStackWiseQuestion = (quizQuestion: Array<any>) => {
  let mySet: any = new Set();
  quizQuestion.map(async (ques) => {
    mySet.add(ques.category);
  });
  mySet = [...mySet];
  const result = [];
  mySet.map(async (cat) => {
    const obj: any = {};
    const newArr = await quizQuestion.filter((ques) => ques.category === cat);
    obj.category = cat;
    obj.question = newArr;
    result.push(obj);
  });
  return result;
};

/**
@param Array of object containing key
@param key
@returns unique Array element containing key
 */
export function getUniqueListByCategory(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}

/**
@param options of a question
@param submittedAnswers user submitted answers
@returns true if found exact match else return false
 */
export const checkCorrectAnswer = (
  options: Array<any>,
  submittedAnswers: Array<any>
) => {
  if (options.length === submittedAnswers.length) {
    return options.every((e: any) => submittedAnswers?.includes(e));
  }
};

/**
@param array of a questions
@param difficulty difficulty level of quiz
@returns all the questions on basis of difficulty level
 */

export const makeQuestions = (array: Array<any>, difficultty: string) => {
  return array.splice(0, difficultyLevel[difficultty]||difficultyLevel['Easy']);
};
