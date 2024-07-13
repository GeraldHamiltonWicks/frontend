import "./styles.css"
import { ReactElement, useEffect, useState } from "react";
import { getTemplates, Template, MAX_OF_THUMBNAILS, mountTemplates } from "../../helpers";

/**
 * FilmStrip component displays a large image and thumbnails for selection.
 */
export function FilmStrip(): ReactElement {
	const [page, setPage] = useState<number>(() => 0);
	const [templates, setTemplates] = useState<Array<Template>>(() => []);
	const [selectedTemplate, setSelectedTemplate]= useState<Template | null>(() => null);

	useEffect(() => {
		loadTemplates();
	}, []);

	async function loadTemplates(): Promise<void> {
        const data = await getTemplates();

		if (data.length > 0) {
            const newTemplates = mountTemplates(data);
            setTemplates(() => newTemplates);
			setSelectedTemplate(() => newTemplates[0]);
		} else {
			console.warn('The image data is empty')
		}
	}

	
	function onTemplateClick(id: string): void {
		const template = templates.find(element => element.id === id);

		if (template) {
			setSelectedTemplate(() => template);
		}
		else {
			console.error('Image data not found, id: ', id);
		}
	}

	function getThumbLinkClassName(id: string): string {
		return id === selectedTemplate?.id ? "active" : ""
	}

	function isToShowPage(_template: Template, index: number): boolean {
		const minPage = page * MAX_OF_THUMBNAILS;
		const maxPage = (page + 1) * MAX_OF_THUMBNAILS;
		return index >= minPage && index < maxPage;
	}

	function nextPage(): void {
		setPage(page => page + 1);
	}

	function previousPage(): void {
		setPage(page => page - 1);
	}

	function isPreviousButtonDisabbled(): boolean {
		return page === 0;
	}

	function isNextButtonDisabled(): boolean {
		const nextPage = (page + 1) * MAX_OF_THUMBNAILS;
		return nextPage >= templates.length;
	}

	if (templates.length === 0 || selectedTemplate === null) {
		return <div id="container">
			...Loading
		</div>
	}

    return <div id="container">
		<header>
			Code Development Project
		</header>
		<div id="main" role="main">
			<div id="large">
				<div className="group">
					<img src={selectedTemplate.image} alt="Large Image" width="430" height="360" />
					<div className="details">
						<p><strong>Title</strong> {selectedTemplate.title}</p>
						<p><strong>Description</strong> {selectedTemplate.description}</p>
						<p><strong>Cost</strong> ${selectedTemplate.cost}</p>
						<p><strong>ID #</strong> {selectedTemplate.id}</p>
						<p><strong>Thumbnail File</strong> {selectedTemplate.thumbnailText}</p>
						<p><strong>Large Image File</strong> {selectedTemplate.imageText}</p>
					</div>
				</div> 
			</div>
			<div className="thumbnails">
				<div className="group">
					{
						templates
						.filter(isToShowPage)
						.map(({ id, thumbnail, thumbnailText }) => {
							return <button title={id} onClick={() => onTemplateClick(id)} className={getThumbLinkClassName(id)} key={id}>
								<img src={thumbnail} alt={thumbnailText} width="145" height="121" />
								<span>{id}</span>
							</button>
						})
					}
					<button className="previous" disabled={isPreviousButtonDisabbled()} title="Previous" onClick={previousPage}>
						Previous
					</button>
					<button className="next" title="Next" disabled={isNextButtonDisabled()} onClick={nextPage}>
						Next
					</button>
				</div>
			</div>
		</div>
		<footer>
			<a href="instructions.pdf">Download PDF Instructions</a>
		</footer>
  </div> 
}