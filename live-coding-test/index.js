/*
    *팁*
    질문을 통해 문제를 확실히 이해한다.
    모르겠는 건 모르겠다고 하고 인터뷰 이후에 찾아보고 배우겠다.
    

    당장 코드의 품질보다 문제를 해결하는데 집중한다.
    가장 베이스 케이스를 해결한다. (3을 할 수 있고 5를 할 수 있어도 0.5를 하려고 하자)
*/

function look(node, result, className) {
  const children = Array.from(node.children);
  children.forEach((child) => {
    if (child.classList?.contains(className)) {
      result.push(child);
    }
    look(child, result, className);
  });
}

function look2(node, result, className) {
  const stack = [node]; // 스택을 사용하여 탐색할 노드를 저장

  while (stack.length > 0) {
    const currentNode = stack.pop(); // 스택에서 노드를 꺼냄
    const children = Array.from(currentNode.children); // 현재 노드의 자식들을 배열로 변환

    children.forEach((child) => {
      if (child.classList?.contains(className)) {
        result.push(child); // 결과 배열에 자식을 추가
      }
      stack.push(child); // 자식을 스택에 추가하여 다음에 탐색
    });
  }
}

function getElementsByClassName(className) {
  const body = document.querySelector("body");
  const result = [];

  look(body, result, className);

  return result;
}

console.log(getElementsByClassName("a"));
