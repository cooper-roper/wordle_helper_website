import { wordList } from "../Data/wordList";

const ResultsProvider = ( rows ) => {
    let filteredList = [...wordList];

    for( var row of rows ) {
        filteredList = filteredList.filter((word) => {
            // check if word matches row
            for (let [i, char] of row.array.entries()) {

                if (char === undefined || char === '' || char === ' ') continue;

                char = char.toLowerCase();
                const color = row.color;
                const charInWordIndex = (char === word[i]);

                if (color === "green" && !(charInWordIndex)) {
                    return false;
                }
                
                const charInWord = word.includes(char);

                if (color === "yellow" && (!(charInWord) || charInWordIndex)) {
                    return false;
                }
                if (color === "gray" && charInWord) {
                    return false;
                }
            }
            return true;
        });
    }   
    return filteredList
};

export default ResultsProvider;


