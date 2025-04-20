import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	//внутреннее состояние приложения
	const [currentStateArticle, setCurrentStateArticle] =
		useState<ArticleStateType>(defaultArticleState);
	useState<ArticleStateType>(defaultArticleState);
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': currentStateArticle.fontFamilyOption.value,
					'--font-size': currentStateArticle.fontSizeOption.value,
					'--font-color': currentStateArticle.fontColor.value,
					'--container-width': currentStateArticle.contentWidth.value,
					'--bg-color': currentStateArticle.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				stateArticle={currentStateArticle}
				setStateArticle={setCurrentStateArticle}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
