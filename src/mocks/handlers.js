import { rest } from "msw";
import { data } from "./data";

let items = [...data];
let id = items[items.length - 1].id;

export function resetData() {
  items = [...data];
  id = items[items.length - 1].id;
}

export const handlers = [
  rest.get("http://localhost:4000/items", (req, res, ctx) => {
    return res(ctx.json(items));
  }),
  rest.post("http://localhost:4000/items", (req, res, ctx) => {
    id++;
    const newItem = { id, ...req.body, isInCart: false };
    items.push(newItem);
    return res(ctx.json(newItem));
  }),
  rest.delete("http://localhost:4000/items/:id", (req, res, ctx) => {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
      return res(ctx.status(404), ctx.json({ message: "Invalid ID" }));
    }
    items = items.filter((q) => q.id !== parseInt(id));
    return res(ctx.json({}));
  }),
  rest.patch("http://localhost:4000/items/:id", (req, res, ctx) => {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
      return res(ctx.status(404), ctx.json({ message: "Invalid ID" }));
    }
    const itemIndex = items.findIndex((item) => item.id === parseInt(id));
    items[itemIndex] = { ...items[itemIndex], ...req.body };
    return res(ctx.json(items[itemIndex]));
  }),
];
