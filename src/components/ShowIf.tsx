import type React from "react";
import type { PropsWithChildren } from "react";

interface ShowIfProps {
  value: boolean;
}

/**
 * Given a boolean value, hide or show the component's children.
 */
export function ShowIf(props: PropsWithChildren<ShowIfProps>) {
  return props.value ? props.children : null;
}

interface ShowWithProps<T> {
  value: T | null | undefined;
  children: (value: T) => React.ReactNode;
}

/**
 * Given a nullable value: if the value exists, pass it through to a JSX-returning function or return null.
 */
export function ShowWith<T>(props: ShowWithProps<T>) {
  if ((props.value ?? null) !== null) {
    return props.children(props.value as T);
  }
  return null;
}
