import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

import {
	ArticleStateType,
	fontColors,
	OptionType,
	fontFamilyOptions,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';

import { SyntheticEvent, useState, useRef } from 'react';

import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
//import { SelectStory } from 'src/ui/separator/Separator.stories';
import { Separator } from 'src/ui/separator/Separator';

import { Text } from 'src/ui/text';

//импорт существующей функции
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

interface ArticleParamsFormProps {
	stateArticle: ArticleStateType;
	setStateArticle: (data: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	setStateArticle,
	stateArticle,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const [selectedStateArticle, setSelectedStateArticle] =
		useState<ArticleStateType>(stateArticle);

	const handleChangeSelectedStat = (
		key: keyof ArticleStateType,
		value: OptionType
	) => {
		setSelectedStateArticle({ ...selectedStateArticle, [key]: value });
	};

	const handleSubmitStateArticle = (e: SyntheticEvent) => {
		e.preventDefault();
		setStateArticle(selectedStateArticle);
	};

	//Сбросить выбранные параметры
	const handleResetSelectedParam = () => {
		setSelectedStateArticle(defaultArticleState);
		setStateArticle(defaultArticleState);
		//console.log("Сброс")
	};

	const rootRef = useRef<HTMLDivElement>(null);

	//вызов существующей функции из стартового набора
	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => !isOpen,
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmitStateArticle}
					onReset={handleResetSelectedParam}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={selectedStateArticle.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(options) =>
							handleChangeSelectedStat('fontFamilyOption', options)
						}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='Размер шрифта'
						selected={selectedStateArticle.fontSizeOption}
						options={fontSizeOptions}
						onChange={(options) =>
							handleChangeSelectedStat('fontSizeOption', options)
						}
					/>

					<Select
						title='Цвет шрифта'
						selected={selectedStateArticle.fontColor}
						options={fontColors}
						onChange={(options) =>
							handleChangeSelectedStat('fontColor', options)
						}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={selectedStateArticle.backgroundColor}
						options={fontColors}
						onChange={(options) =>
							handleChangeSelectedStat('backgroundColor', options)
						}
					/>
					<Select
						title='Ширина'
						selected={selectedStateArticle.contentWidth}
						options={contentWidthArr}
						onChange={(options) =>
							handleChangeSelectedStat('contentWidth', options)
						}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
