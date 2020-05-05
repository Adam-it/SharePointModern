import ISPListItems from '../model/ISPListItem';

class MockTestApiWebpartListGetItems{

    private _listItems: ISPListItems[] = [
        {Id: 1, Title: "mocked Item 1"},
        {Id: 2, Title: "mocked Item 2"},
        {Id: 3, Title: "mocked Item 3"}
    ];

    public get(url: string): Promise<ISPListItems[]>{
        return new Promise<ISPListItems[]>((resolve) => {
            resolve(this._listItems);
        });
    }

    public add(title: string): Promise<boolean>{
        return new Promise<boolean>((resolve) => {
            this._listItems.push({
                Id: this._listItems.length,
                Title: title
            });
            resolve(true);
        });
    }

    public delete(id: number): Promise<void>{
        console.log('delete');
        return new Promise<void>((resolve) => {
            let item = this._listItems.filter((m) => m.Id === id);
	        this._listItems.splice(this._listItems.indexOf(item[0]), 1);
            resolve();
        });
    }
}

export default MockTestApiWebpartListGetItems;