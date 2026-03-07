
const STATUS = {
    CREATED : 201,
    OK : 200,
    UNPROCESSABLE_ENTITY : 422,
    INTERNAL_SERVER_ERROR : 500,
    UNAUTHORISED : 401,
    FORBIDDEN : 403,
    BAD_REQUEST : 400,
    NOT_FOUND : 404,
    CONFLICT: 409,
    TOOMANYREQUEST: 429
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

const JUDGE0_STATUS = {
  1: "In Queue",
  2: "Processing",
  3: "Accepted",
  4: "Wrong Answer",
  5: "Time Limit Exceeded",
  6: "Compilation Error",
  7: "Runtime Error (SIGSEGV)",
  8: "Runtime Error (SIGXFSZ)",
  9: "Runtime Error (SIGFPE)",
  10: "Runtime Error (SIGABRT)",
  11: "Runtime Error (NZEC)",
  12: "Runtime Error (Other)",
  13: "Internal Error",
  14: "Exec Format Error"
};

const LANGUAGE = {
    'c++' :  54,
    'javascript' : 63,
    'java' : 62,
    'python' : 71
}



module.exports = {
    STATUS,
    USER_ROLE,
    DIFFICULTY_LEVEL,
    TAGS,
    JUDGE0_STATUS,
    LANGUAGE
}