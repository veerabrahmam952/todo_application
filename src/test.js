// function getMaxVowels(s, k) {
//   let vowels = ["a", "e", "i", "o", "u"];
//   let start = 0;
//   let count = 0;
//   let maxCount = 0;

//   for (var end = 0; end < s.length; end++) {
//     if (vowels.includes(s[end])) {
//       count += 1;
//     }
//     if (end - start + 1 > k) {
//       if (vowels.includes(s[start])) {
//         count -= 1;
//       }
//       start += 1;
//     }
//     maxCount = Math.max(maxCount, count);
//     if (maxCount === k) return maxCount;
//   }
//   return maxCount;
// }

// var _max_count = getMaxVowels("leetcode", 3);
// console.log(_max_count);

// function deleteNode(node) {
//   if (node === null) return;
//   else {
//     if (node.next !== null) {
//       node.value = node.next.value;
//       node.next = node.next.next;
//     }
//   }
//   console.log(node);
// }

// function solve(board) {
//   for (var i = 0; i < board.length; i++) {
//     for (var j = 0; j < board[0].length; j++) {
//       if (
//         board[i][j] === "0" &&
//         (i === 0 ||
//           j === 0 ||
//           i === board.length - 1 ||
//           j === board[0].length - 1)
//       )
//         dfs(i, j);
//     }
//   }

//   for (var i = 0; i < board.length; i++) {
//     for (var j = 0; j < board[0].length; j++) {
//       if (board[i][j] === "Visited") {
//         board[i][j] = "0";
//       } else {
//         board[i][j] = "X";
//       }
//     }
//   }

//   function dfs(i, j) {
//     if (
//       i < 0 ||
//       i >= board.length ||
//       j < 0 ||
//       j >= board[i].length ||
//       board[i][j] === "Visited" ||
//       board[i][j] === "X"
//     )
//       return;
//     board[i][j] = "Visited";
//     dfs(i + 1, j);
//     dfs(i - 1, j);
//     dfs(i, j + 1);
//     dfs(i, j - 1);
//     return;
//   }
//   console.log(board);
// }

// solve([
//   ["X", "X", "X", "X"],
//   ["X", "O", "O", "X"],
//   ["X", "X", "O", "X"],
//   ["X", "O", "X", "X"],
// ]);

// function kidsWithCandies(candies, extraCandies) {
//   const maxCandy = Math.max(...candies);
//   return candies.map((candy) => candy + extraCandies >= maxCandy);
// }

// var res = kidsWithCandies([2, 3, 5, 1, 3], 3);
// console.log(res);
