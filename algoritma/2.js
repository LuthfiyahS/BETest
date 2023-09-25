function countWordsInArray(input, query) {
    let result = [];

    query.forEach(q => {
        count = 0;
        input.forEach(word => {
            if (q === word) {
                count++;
            }
        });
        result.push(count) ;
    });
    // foreach (query as q) {
    //     count = 0;

    //     foreach (input as word) {
    //         if (q === word) {
    //             count++;
    //         }
    //     }

    //     result[] = count;
    // }

    return result;
}

let input = ['xc', 'dz', 'bbb', 'dz'];
let query = ['bbb', 'ac', 'dz'];

let output = countWordsInArray(input, query);
console.table(output);