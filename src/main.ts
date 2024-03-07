import "./css/style.css"
import ListItem from "./model/ListItem"
import FullLIst from "./model/FullList"
import ListTemplate from "./templates/LIstTemplate"

const initApp = () => {
	const fulList = FullLIst.instance
	const template = ListTemplate.instance

	const form = document.getElementById("itemEntryForm") as HTMLFormElement
	form.addEventListener("submit", (e) => {
		e.preventDefault()

		const input = document.getElementById("newItem") as HTMLInputElement
		const itemText: string = input.value.trim()
		if (!itemText) return

		const itemId: number = fulList.item.length
			? parseInt(fulList.item[fulList.item.length - 1].id) + 1
			: 1

		const newItem = new ListItem(itemId.toString(), itemText)
		fulList.addItem(newItem)
		template.render(fulList)
	})

	const clearItems = document.getElementById(
		"clearItemsButton"
	) as HTMLButtonElement

	clearItems.addEventListener("click", () => {
		fulList.clearList()
		template.clear()
	})

	fulList.load()
	template.render(fulList)
}

document.addEventListener("DOMContentLoaded", initApp)
