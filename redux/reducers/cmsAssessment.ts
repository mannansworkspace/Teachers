import { ActionType } from "redux/actionTypes/index";

const initialState = {
  classes: [],
  assessments:[],
  summatives: [],
  formatives: [],
  questions: [],
  isGivenByStudent: false,
  question: null,
  assessmentName: ''
};


const cmsAssessmentReducer = (state = initialState, action: any): any => {
    switch (action.type) {
        case ActionType.GET_ALL_SUBJECTS_AND_GRADES:
            return {
                ...state,
                classes: action.payload
            };
        case ActionType.GET_ALL_SUBJECTS_AND_GRADES_FAIL:
            return {
                ...state,
                classes: []
            }
        case ActionType.GET_ALL_ASSESSMENTS:
            const { formatives, summatives} = action.payload
            const assessments = []

            assessments.push( ...summatives.map((summative:any) => {
                return {
                    ...summative,
                    type: 'summatives',
                    key: summative.id
                }
            }))

            assessments.push( ...formatives.map((formative:any) => {
                return {
                    ...formative,
                    type: 'formatives',
                    key: formative.formative_id
                }
            }))
            return {
                ...state,
                assessments
            };
        case ActionType.GET_ALL_ASSESSMENTS_FAIL:
            return {
                ...state,
                assessments: [],
            };
        case ActionType.GET_ALL_QUESTIONS:
            return {
                ...state,
                questions: action.payload.questions,
                isGivenByStudent: action.payload.is_given_by_student
            };
        case ActionType.GET_ALL_QUESTIONS_FAIL:
            return {
                ...state,
                questions: []
            };
        case ActionType.SET_ASSESSMENT_QUESTION:
            const index = action.payload
            const selectedQuestion: any = state.questions[index]

            const question = {...selectedQuestion, questionNo: index+1}

            return {
                ...state,
                question
            };
        case ActionType.SET_ASSESSMENT:
            return {
                ...state,
                assessmentName: action.payload
            }
        default:
            return state;
        }
}

export default cmsAssessmentReducer;