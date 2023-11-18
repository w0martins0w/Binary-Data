"use strict";

const outTableOFContent =
	document.body.querySelector("body > section#table-of-content");

function TableOFContent(outTableOFContent, currentNode, indent = 1) {
	let sections = [];
	/* Retrieve Direct Section Nodes */
	for (const childNode of currentNode.children) {
		if (childNode.tagName.toLowerCase() == "section") {
			sections.push(childNode);
		}
	}
	/* Table OF Content */
	if (sections.length != 0) {
		const table = document.createElement("ul");
		outTableOFContent.appendChild(table);
		for (const sectionNode of sections) {
			let sectionTitle = "<unnamed>";
			for (const childNode of sectionNode.children) {
				if (childNode.tagName.toLowerCase() ==
						"h" + indent.toString()) {
					sectionTitle = childNode.textContent;
					break;
				}
			}
			/* Create Entry */
			const entry = document.createElement("li");
			if (sectionNode.hasAttribute("id")) {
				const entryLink = document.createElement("a");
				entryLink.setAttribute(
					"href", "#" + sectionNode.getAttribute("id")
				);
				entryLink.textContent = sectionTitle;
				entry.appendChild(entryLink);
			} else {
				entry.textContent = sectionTitle;
			}
			/* Insert Entry */
			table.appendChild(entry);
			/* Search Subsections */
			TableOFContent(table, sectionNode, indent + 1);
		}
	}
}

TableOFContent(outTableOFContent, document.body);
