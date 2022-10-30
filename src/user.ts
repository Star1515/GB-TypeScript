import { renderBlock } from './lib.js'
import { IUser } from './interfaces.js'

export function renderUserBlock(name: string, avatarLink: string, favoriteItemsAmount: number) {

  const items: number | string = Boolean(favoriteItemsAmount) ? favoriteItemsAmount : 'ничего нет';

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src=${avatarLink} alt="Wade Warren" />
      <div class="info">
          <p class="name">${name}</p>
          <p class="fav">
            <i class="heart-icon${Boolean(favoriteItemsAmount) ? 'active' : ''}"></i>${items}
          </p>
      </div>
    </div>
    `
  );
}

export function getUserData(): IUser | null {
  const IsItem: string = localStorage.getItem('user');

  if (IsItem)
    try {
      const user: unknown = JSON.parse(IsItem);
      if (typeof user === 'object' && 'userName' in user && 'avatarUrl in user')
        return { userName: user['userName'], avatarUrl: user['avatarUrl'] };
    }
    catch (e) {
      throw new Error(e);
    }
  return null;
}

export function getFavoritesAmount(): number {
  const amount: unknown = localStorage.getItem('favoritesAmount');
  if (amount && !isNaN(Number(amount)))
    return +amount;
  else
    return 0;
}

export function setLocalStorage(): void {
  localStorage.setItem('user', '{"username":"Masha", "avatarUrl": "cat.png"}');
  localStorage.setItem('favoritesAmount', '5');
}

