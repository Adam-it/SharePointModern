import ISPListItems from '../model/ISPListItem';

export default class MockTestApiWebpartListGetItems{
    private static _listItems: ISPListItems[] = [
        {Id: 1, Title: "mocked Item 1"},
        {Id: 2, Title: "mocked Item 2"},
        {Id: 3, Title: "mocked Item 3"}
    ];

    public static get(url: string): Promise<ISPListItems[]>{
        return new Promise<ISPListItems[]>((resolve) => {
            resolve(MockTestApiWebpartListGetItems._listItems);
        });
    }
}