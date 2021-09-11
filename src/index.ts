let root = document.querySelector("#app")!;
let imported = document.querySelector("#imported")!;

type ImportModuleFn = () => Promise<{ getMessage: () => string }>;
type RollResult = 1 | 2 | 3 | 4 | 5 | 6;

async function importRandomMessage() {
  const importMap: Record<RollResult, ImportModuleFn> = {
    1: () => import("./getMessage1"),
    2: async () => await import("./getMessage2"),
    3: async () => await import("./getMessage3"),
    4: () => import("./getMessage4"),
    5: () => import("./getMessage5"),
    6: () => import("./getMessage6")
  };

  const rollDie = () => Math.ceil(6 - 6 * Math.random()) as RollResult;

  const rollResult = rollDie();
  const ImportModuleFunction: ImportModuleFn = importMap[rollResult];
  const module = await ImportModuleFunction();

  imported.innerHTML = `${module.getMessage()}`;
}

function renderUI() {
  return `<button id="rollDie">Roll Die</button>`;
}

root.innerHTML = renderUI();

const button = document.querySelector("#rollDie");
button?.addEventListener("click", importRandomMessage);
