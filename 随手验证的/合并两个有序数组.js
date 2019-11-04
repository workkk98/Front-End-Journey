var merge = function(nums1, m, nums2, n) {
  if(m===0 || n ===0) {
    if(m===0 && n!==0) {
      for(let i = 0 ; i<n;i++) {
        nums1[i] = nums2[i]
      }
      return
    } else if( m!==0 && n===0) {
      return
    } else {
      return
    }
  }
  //arr 是nums1有效值 i是数组1的指针 j是数组2的指针 
  let arr ,i = m ,j = n;
  let len = nums1.length;
  arr = nums1.slice(0,m)
  i--;
  j--;
  len--;
  while( len>=0 ) {
    if( i >=0 && j >= 0 ) {
      if( arr[i] >= nums2[j] ) {
        nums1[len] = arr[i];
        i--;
      } else {
        nums1[len] = nums2[j];
        j--;
      }
    } else if( i >=0 || j < 0 ) {
      nums1[len] = arr[i];
      i--;
    } else if( i<0 || j >= 0) {
      nums1[len] = nums2[j];
      j--
    }
    len--;
  }
};