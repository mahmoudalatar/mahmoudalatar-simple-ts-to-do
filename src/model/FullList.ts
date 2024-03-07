import ListItem from "./ListItem"

interface List {
	item: ListItem[]
	load(): void
	save(): void
	clearList(): void
	addItem(objItem: ListItem): void
	removeItem(id: string): void
}

export default class FullLIst implements List {
	static instance: FullLIst = new FullLIst()

	private constructor(private _item: ListItem[] = []) {}

	load(): void {
		const sortedItem: string | null = localStorage.getItem("myList")
		if (typeof sortedItem !== "string") return

		const parsedList: { _id: string; _item: string; _checked: boolean }[] =
			JSON.parse(sortedItem)

		parsedList.forEach((itemObj) => {
			const newItemList = new ListItem(
				itemObj._id,
				itemObj._item,
				itemObj._checked
			)
			FullLIst.instance.addItem(newItemList)
		})
	}

	get item(): ListItem[] {
		return this._item
	}

	save(): void {
		localStorage.setItem("myList", JSON.stringify(this._item))
	}

	clearList(): void {
		this._item = []
		this.save()
	}

	addItem(objItem: ListItem): void {
		this._item.push(objItem)
		this.save()
	}

	removeItem(id: string): void {
		this._item = this._item.filter((e) => e.id !== id)
		this.save()
	}
}
