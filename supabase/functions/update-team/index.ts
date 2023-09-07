import { serve } from "std/server";
import { createClient } from "@supabase/supabase-js";

console.log('updating team function started')

const TEAM_PREFIX= 'tc_ww23_';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const getWooData = async (competition: string) => {
    let offset = 0;
    let total = 50;
    let teams = [];

    do {
        const response = await fetch(`https://prod3.apiwoo.com/v1/tc/leaderboards?competition=${competition}&pageSize=50&offset=${offset}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'en-GB,en;q=0.6',
                'Authorization': 'cbb1c29372536ad03c725af741cda7282767416ddca7aabbc50d3ed4f2c2ac81a38f26930ec7baf0a3d4c92f490da97f44107989b9e134c351c95335f139e8b0',
                'Connection': 'keep-alive',
                'Origin': 'https://leaderboards.wooworlds.com',
                'Referer': 'https://leaderboards.wooworlds.com/',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site',
                'Sec-GPC': '1',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
                'sec-ch-ua': '"Not/A)Brand";v="99", "Brave";v="115", "Chromium";v="115"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Linux"'
            }
        });
        const jsonData = await response.json();
        total = jsonData.total;
        offset += 50;
        teams.push(...jsonData.items);
    } while (offset < total);


    return teams
}

const getTeamNames = (teams: any[]) => {
    return teams.map((team) => TEAM_PREFIX + team.name.toLowerCase());
}

const filterNzTeams = (teams: any[], teamNames: any[]) => {
    return teams.filter(team => teamNames.includes(team.name));
}
const updateMaxHeight = async (teams: any[]) => {
    console.log('retrieving max height')
    const teamData = await getWooData('tc_ww23_teammaxheight');

    const nzTeams =filterNzTeams(teamData, getTeamNames(teams));

    nzTeams.forEach((team) => {
        teams.find((t) => t.name.toLowerCase() === team.name.replace(TEAM_PREFIX, '')).max_height = team.teammaxheight;
    });
    console.log('done');
    return teams;
}

const updateTotalHeight = async (teams: any[]) => {
    console.log('retrieving total height')
    const teamData = await getWooData('tc_ww23_teamtotheight');

    const nzTeams =filterNzTeams(teamData, getTeamNames(teams));

    nzTeams.forEach((team) => {
        teams.find((t) => t.name.toLowerCase() === team.name.replace(TEAM_PREFIX, '')).total_height = team.teamtotheight;
    });
    console.log('done');
    return teams;
}

const updateTotalDistance = async (teams: any[]) => {
    console.log('retrieving total distance')
    const teamData = await getWooData('tc_ww23_teamtotdistance');

    const nzTeams =filterNzTeams(teamData, getTeamNames(teams));

    nzTeams.forEach((team) => {
        teams.find((t) => t.name.toLowerCase() === team.name.replace(TEAM_PREFIX, '')).total_distance = team.teamtotdistance;
    });
    console.log('done');
    return teams;
}
serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get("SUPABASE_URL") ?? "",
            Deno.env.get("SUPABASE_KEY") ?? "",
            {
                auth: {
                    persistSession: false //or true
                }
            }
        );
        console.log('loading nz teams')
        const teamsSelect = await supabaseClient.from('team').select();
        let teams = teamsSelect.data;
        console.log(`${teams.length} teams loaded`)

        teams = await updateMaxHeight(teams);
        teams = await updateTotalHeight(teams);
        teams = await updateTotalDistance(teams);

        console.log('updating nz teams')
        teams.forEach(async (team) => {
            await supabaseClient.from('team').update(team).eq('id', team.id);
        });

        console.log("ok");
        return new Response('OK', { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response('ERROR', {
            status: 200,
        });
    }
});