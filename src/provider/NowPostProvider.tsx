import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useState,
} from "react";

export const NowPostContext = createContext(
  {} as {
    start: number; // ポストの配列を保持

    setStart: Dispatch<SetStateAction<number>>;
  }
);

export const NowPostProvider = (props: { children: ReactElement }) => {
  const { children } = props;

  const [start, setStart] = useState(0);

  return (
    <NowPostContext.Provider value={{ start, setStart }}>
      {children}
    </NowPostContext.Provider>
  );
};
