import { ColorUtil } from "../ColorUtil";

String.prototype.alpha = function (a?: number, as?: string): string {
    return as === "rgba" ? ColorUtil.toRGBA(String(this), a) : ColorUtil.toHEX(String(this), a);
};
