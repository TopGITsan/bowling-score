import { inject } from "@angular/core";
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { GameStoreService } from "../store/game-store.service";

export const canActivateGame: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
   const gameStoreService: GameStoreService = inject(GameStoreService);
   return true;
};
