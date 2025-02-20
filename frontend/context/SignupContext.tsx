import { createContext, ReactNode, useReducer } from "react";

interface SignupState {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  displayName: string;
  birthdate: Date;
  image: string;
  gender: string;
  interests: string[];
}

type SignupAction =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_CONFIRM_PASSWORD"; payload: string }
  | { type: "SET_FIRST_NAME"; payload: string }
  | { type: "SET_LAST_NAME"; payload: string }
  | { type: "SET_DISPLAY_NAME"; payload: string }
  | { type: "SET_BIRTHDATE"; payload: Date }
  | { type: "SET_IMAGE"; payload: string }
  | { type: "SET_GENDER"; payload: string }
  | { type: "SET_INTERESTS"; payload: string[] };

const initialState: SignupState = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  displayName: "",
  birthdate: new Date("2000-01-01"),
  image: "",
  gender: "",
  interests: [],
};

const signupReducer = (
  state: SignupState,
  action: SignupAction
): SignupState => {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.payload };
    case "SET_FIRST_NAME":
      return { ...state, firstName: action.payload };
    case "SET_LAST_NAME":
      return { ...state, lastName: action.payload };
    case "SET_DISPLAY_NAME":
      return { ...state, displayName: action.payload };
	case "SET_BIRTHDATE":
		return { ...state, birthdate: action.payload };
    case "SET_IMAGE":
      return { ...state, image: action.payload };
    case "SET_GENDER":
      return { ...state, gender: action.payload };
    case "SET_INTERESTS":
      return { ...state, interests: action.payload };
    default:
      return state;
  }
};

interface SignupContextType {
  state: SignupState;
  dispatch: React.Dispatch<SignupAction>;
}

export const SignupContext = createContext<SignupContextType>({
  state: initialState,
  dispatch: () => {},
});

export const SignupProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(signupReducer, initialState);

  return (
    <SignupContext.Provider value={{ state, dispatch }}>
      {children}
    </SignupContext.Provider>
  );
};
