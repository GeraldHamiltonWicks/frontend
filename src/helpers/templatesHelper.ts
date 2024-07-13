import { Template } from "./types";

/**
 * Enhances each Template object with image paths.
 * 
 * @param data Array of Template objects.
 * @returns Array of Template objects with image and thumbnail paths added.
 */
export function mountTemplates(data: Array<Template>): Array<Template> {
    return data.map(element => ({
        ...element,
        image: require(`../assets/images/large/${element.image}`),
        thumbnail: require(`../assets/images/thumbnails/${element.thumbnail}`),
        imageText: element.image,
        thumbnailText: element.thumbnail
    }))
}