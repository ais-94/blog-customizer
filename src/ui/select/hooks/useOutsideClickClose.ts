import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isOpen && onClose?.();
				onChange?.(false);
			}
		};

		document.body.addEventListener('mousedown', handleClick);

		//Добавлено
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				isOpen && onClose?.();
				onChange?.(false);
			}
		};

		window.addEventListener('keydown', handleEscape);

		return () => {
			window.removeEventListener('keydown', handleEscape);
			document.body.removeEventListener('mousedown', handleClick);
		};
	}, [onClose, onChange, isOpen]);
};
