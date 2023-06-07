const fetch = require('node-fetch');
const fs = require('fs');

async function fetchProgrammersStats() {
  const token = process.env.PROGRAMMERS_API_TOKEN;
  const username = 'your_programmers_username';

  const response = await fetch(`https://api.programmers.co.kr/v1/users/${username}/submissions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Programmers stats');
  }

  const data = await response.json();

  // 풀이 기록을 가공하여 업데이트할 내용을 생성합니다.
  const stats = {
    problemCount: data.total_count,
    difficultyLevel: data.difficulty_level,
  };

  // README.md 파일 업데이트 예시
  const readmeContent = fs.readFileSync('./README.md', 'utf8');
  const updatedReadmeContent = readmeContent.replace(
    /<!-- PROGRAMMERS_STATS_START -->[\s\S]*<!-- PROGRAMMERS_STATS_END -->/,
    `<!-- PROGRAMMERS_STATS_START -->\n\n${JSON.stringify(stats, null, 2)}\n\n<!-- PROGRAMMERS_STATS_END -->`
  );
  fs.writeFileSync('./README.md', updatedReadmeContent, 'utf8');

  console.log('Programmers stats updated successfully');
}

fetchProgrammersStats().catch((error) => {
  console.error(error);
  process.exit(1);
});
