class Util {
  static sortObjectsByDate<T>(list: T[], dateParam: string) {
    console.log('ITEMS', list);

    return list.sort(
      (itemA, itemB) => itemB[dateParam].getTime() - itemA[dateParam].getTime()
    );
  }

  static sortByDate(list: Date[]) {
    return list.sort((dateA, dateB) => dateB.getTime() - dateA.getTime());
  }
}

export default Util;
