import FullLIst from "../model/FullList"

interface DomList {
	ul: HTMLUListElement
	clear(): void
	render(fulList: FullLIst): void
}

export default class ListTemplate implements DomList {
	static instance: ListTemplate = new ListTemplate()

	ul: HTMLUListElement

	private constructor() {
		this.ul = document.getElementById("listItems") as HTMLUListElement
	}

	clear(): void {
		this.ul.innerHTML = ""
	}

	render(fulList: FullLIst): void {
		this.clear()
		fulList.item.forEach((ele) => {
			const li = document.createElement("li") as HTMLLIElement
			li.className = "item"

			const check = document.createElement("input") as HTMLInputElement
			check.type = "checkbox"
			check.id = ele.id
			check.tabIndex = 0
			check.checked = ele.checked
			li.append(check)
			check.addEventListener("change", () => {
				ele.checked = !ele.checked
				fulList.save()
			})

			const label = document.createElement("label") as HTMLLabelElement
			label.htmlFor = ele.id
			label.innerHTML = ele.item
			li.append(label)

			const button = document.createElement("button") as HTMLButtonElement
			button.className = "button"
			button.innerHTML = "X"
			li.append(button)
			button.addEventListener("click", () => {
				fulList.removeItem(ele.id)
				this.render(fulList)
			})
			this.ul.append(li)
		})
	}
}
