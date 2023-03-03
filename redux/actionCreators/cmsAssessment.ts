import axios from 'util/axios';
import { ActionType } from 'redux/actionTypes/index';
import { Dispatch } from 'redux';
import config from "config/config";

export const setSelectedAssessment = (assessmentName: string) => async (dispatch: Dispatch) => {

  dispatch({
    type: ActionType.SET_ASSESSMENT,
    payload: assessmentName,
  });
}

export const setAssesmentQuestion = (index: number) => async (dispatch: Dispatch) => {
  dispatch({
    type: ActionType.SET_ASSESSMENT_QUESTION,
    payload: index,
  });
}

export const setSelectedQuestion = (question: any) => async (dispatch: Dispatch) => {
  dispatch({
    type: ActionType.SET_ASSESSMENT_QUESTION,
    payload: question,
  });
}

export const getClassesAction = () => async (dispatch: Dispatch) => {
  try {
    await axios
      .get(`${config.defaults.api_url}/cms/grade/subject/list`)
      .then((res) => {
        dispatch({
          type: ActionType.GET_ALL_SUBJECTS_AND_GRADES,
          payload: res.data.data,
        });
      });
  } catch (error) {
    console.log(error)
    dispatch({
      type: ActionType.GET_ALL_SUBJECTS_AND_GRADES_FAIL
    });
  }
}

export const getAssessmentsAction = (grade_id: number, subject_id: number) => async (dispatch: Dispatch) => {
  try {
    await axios
      .get(`${config.defaults.api_url}/cms/formatives/summatives/list/${grade_id}/${subject_id}`)
      .then((res) => {
        dispatch({
          type: ActionType.GET_ALL_ASSESSMENTS,
          payload: {
            formatives: res.data.data.formatives,
            summatives: res.data.data.summatives
          },
        });
      });
  } catch (error) {
    console.log(error)
    dispatch({
      type: ActionType.GET_ALL_ASSESSMENTS_FAIL
    });
  }
}

export const getQuestions = async (assessmentType: string, assessmentId: number): Promise<{ questions: any, isGivenByStudent: boolean, objective_id: number | undefined}> => {
  try {
    const { data } = await axios
      .get(`${config.defaults.api_url}/cms/${assessmentType}/${assessmentId}`)
      
      return {
        questions: data.data[assessmentType === 'formatives' ? 'formativeQuestion' : 'summativeQuestion'],
        isGivenByStudent: data.data.is_given_by_student,
        objective_id: data.data.objective_id
      }
  } catch (error) {
    return {
      questions: [],
      isGivenByStudent: false,
      objective_id: undefined
    }
  }
}

export const updateQuestions = async (updatedQuestions: any, assessmentType: string): Promise<boolean> => {
  try {
    await axios
      .put(`${config.defaults.api_url}/cms/${assessmentType}/questions`, updatedQuestions)
      
      return Promise.resolve(true)
  } catch (error) {
     return Promise.resolve(false)
  }
}


export const saveFormativeObjective = async (formative_id: number, objective_id: number): Promise<boolean> => {
  try {
    await axios
      .put(`${config.defaults.api_url}/cms/formatives/objective/${formative_id}`, { objective_id })
      
      return Promise.resolve(true)
  } catch (error) {
     return Promise.resolve(false)
  }
}


export const saveSummativeObjective = async (question_id: number, objective_id: number): Promise<boolean> => {
  try {
    await axios
      .put(`${config.defaults.api_url}/cms/summatives/questions/objective/${question_id}`, { objective_id })
      
      return Promise.resolve(true)
  } catch (error) {
     return Promise.resolve(false)
  }
}