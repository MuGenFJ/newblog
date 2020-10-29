const slugify = function (text) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')       // Replace spaces with -
        .replace(/[^\w-]+/g, '')    // Remove all non-word chars
        .replace(/--+/g, '-')       // Replace multiple - with single -
        .replace(/^-+/, '')         // Trim - from start of text
        .replace(/-+$/, '')         // Trim - from end of text
}

module.exports = { slugify }

//What this will do? It will create a slug from a word 
//A slug is a URL friendly string
//We are here to a node.js syntax so thats why we do module.exports         

