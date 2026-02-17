
const STATUS = {
    CREATED : 201,
    OK : 200,
    UNPROCESSABLE_ENTITY : 422,
    INTERNAL_SERVER_ERROR : 500,
    UNAUTHORISED : 401,
    FORBIDDEN : 403,
    BAD_REQUEST : 400,
    NOT_FOUND : 404,
    CONFLICT: 409
}

const USER_ROLE = {
    user : 'USER',
    admin : 'ADMIN'
}

const DIFFICULTY_LEVEL = {
    EASY : 'Easy',
    MEDIUM: 'Medium',
    HARD: 'Hard'
}

const TAGS = {
  Array: "array",
  String: "string",
  LinkedList: "linked list",
  Stack: "stack",
  Queue: "queue",
  Tree: "tree",
  BinarySearchTree: "binary search tree",
  Heap: "heap",
  Hashing: "hashing",
  Graph: "graph",
  Recursion: "recursion",
  Backtracking: "backtracking",
  DynamicProgramming: "dynamic programming",
  Greedy: "greedy",
  Sorting: "sorting",
  Searching: "searching",
  BitManipulation: "bit manipulation",
  Trie: "trie",
  SegmentTree: "segment tree",
  DisjointSet: "disjoint set union"
};



module.exports = {
    STATUS,
    USER_ROLE,
    DIFFICULTY_LEVEL,
    TAGS
}