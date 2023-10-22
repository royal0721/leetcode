// 題目 target -> 傳回 0 和 1 數量相等的連續子數組的最大長度。

/**
 * @param {number[]} nums
 * @return {number}
 */

var findMaxLength = function(nums) {

     // subarray 和 -> sum[j:i] = prefixsum[i] - prefixsum[j-1];
     // x x [x x x x]
     //      j     i    
     
     // target: the maximum length of a contiguous subarray with the sum equals to zero

    // 在 index = -1 處，在遍歷數組之前，計數為 0；

    let hashMap = {0: -1};
    let prefixSum = 0;
    let max = 0;

    // nums = [0, 0, 1, 1, 0, 1];
    for (let i = 0; i < nums.length; i++) {

        // 0
        // 0
        // 1
        // 1
        // 0
        // 1

        // (1) 0
        // (2) 0
        // (3) 1
        // (4) 1
        // (5) 0
        // (6) 1

        if (nums[i] == 0) {
            // (1) prefixSum = -1
            // (2) prefixSum = -2
            // (5) prefixSum = -1
            prefixSum--;
        } else {
            // (3) prefixSum = -1
            // (4) prefixSum = 0
            // (6) prefixSum = 0
            prefixSum++;
        }
        
        if (hashMap[prefixSum] != null) {
            // (3) max = Math.max(max, 2 - hashMap[-1]); = 2
            // (4) max = Math.max(max, 3 - hashMap[0]); = 4
            // (5) max = Math.max(max, 4 - hashMap[-1]); = 4 
            // (6) max = Math.max(max, 5 - hashMap[0]); = 6 
            max = Math.max(max, i - hashMap[prefixSum]);
        } else {
            // (1) { 0: -1, -1: 0 }
            // (2) { 0: -1, -1: 0, -2: 1 }
            // (3) { 0: -1, -1: 0, -2: 1, 1: 2 }
            // (4) { 0: -1, -1: 0, -2: 1, 1: 2 , 2: 3 }
            hashMap[prefixSum] = i; 
        }
        // 紀錄 hashMap 
    }
  
    return max; // return max = 6

    // sum[j:i] = prefixsum[i] - prefixsum[j - 1];
    
    //  [ x x x x ]
    //  -1        i
    // sum[j:i] = prefixsum[i] - prefixsum[-1];
    //  hasMap = {0: -1} 
    //  i - (-1) = i + 1 = len
};

// Big O:
// time: O(n)
// space: O(n)

// 0, 1, 0, 0, 0
// -1, 1, -1, -1, -1
// prefix sum: -1, 0, -1, -2, -3
