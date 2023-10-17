import React, { forwardRef } from 'react';

export type FixedForwardRef = <T, P = {}>(
	render: (props: P, ref: React.Ref<T>) => React.ReactNode,
) => (props: P & React.RefAttributes<T>) => React.ReactElement;

export const genericForwardRef = forwardRef as FixedForwardRef;

export function has<T>(value: T | null | undefined): value is T {
	return value !== null && value !== undefined;
}
