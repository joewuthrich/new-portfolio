export enum Directions {
  UP = "up",
  DOWN = "down",
  RIGHT = "right",
  LEFT = "left",
}

export const detectSwipe = ({
  swipeDelta,
  setSwipeDelta,
  isSwiping,
  setIsSwiping,
  moveScreenAction,
}: any) => {
  let direction = null;
  const el = document.getElementById("container");

  const touchStart = (e) => {
    const t = e.touches[0];
    setSwipeDelta((prev) => ({
      ...prev,
      sX: t.screenX,
      sY: t.screenY,
    }));
    setIsSwiping(true);
  };

  const touchMove = (e) => {
    if (!isSwiping) return;
    const t = e.touches[0];
    setSwipeDelta((prev) => ({
      ...prev,
      eX: t.screenX,
      eY: t.screenY,
    }));
  };

  const touchEnd = (e) => {
    if (!isSwiping) return;
    setIsSwiping(false);
    const deltaX = swipeDelta.eX - swipeDelta.sX;
    const deltaY = swipeDelta.eY - swipeDelta.sY;
    if (deltaX ** 2 + deltaY ** 2 < 90 ** 2) return;

    if (deltaY === 0 || Math.abs(deltaX / deltaY) > 1)
      direction = deltaX > 0 ? Directions.RIGHT : Directions.LEFT;
    else direction = deltaY > 0 ? Directions.UP : Directions.DOWN;

    if (direction === Directions.DOWN) {
      moveScreenAction(Directions.DOWN);
    } else if (
      direction === Directions.UP &&
      document.getElementById("journey-screen").scrollTop < 10
    ) {
      moveScreenAction(Directions.UP);
    }

    direction = null;
  };

  el.addEventListener("touchstart", touchStart);
  el.addEventListener("touchmove", touchMove);
  el.addEventListener("touchend", touchEnd);

  return () => {
    el.removeEventListener("touchstart", touchStart);
    el.removeEventListener("touchmove", touchMove);
    el.removeEventListener("touchend", touchEnd);
  };
};
