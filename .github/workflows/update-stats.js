const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function fetchProgrammersStats() {
  const username = 'hghg1036@gmail.com';
  const profileUrl = `https://programmers.co.kr/${username}`;

  try {
    const response = await axios.get(profileUrl);
    const $ = cheerio.load(response.data);

    // 풀이한 문제 수 추출 예시
    const problemCount = $('.section-total').find('.total-count').text();

    // 랭킹 추출 예시
    const ranking = $('.rank-card').find('.rank-number').text();

    // README.md 파일 업데이트 예시
    const readmeContent = fs.readFileSync('./README.md', 'utf8');
    const updatedReadmeContent = readmeContent.replace(
      /<!-- PROGRAMMERS_STATS_START -->[\s\S]*<!-- PROGRAMMERS_STATS_END -->/,
      `<!-- PROGRAMMERS_STATS_START -->\n\nProblem Count: ${problemCount}\nRanking: ${ranking}\n\n<!-- PROGRAMMERS_STATS_END -->`
    );
    fs.writeFileSync('./README.md', updatedReadmeContent, 'utf8');

    console.log('Programmers stats updated successfully');
  } catch (error) {
    console.error('Failed to fetch Programmers stats:', error);
  }
}

fetchProgrammersStats();
