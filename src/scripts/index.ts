import { Member, MemberDataResponse } from '../types';
import HandlebarsTemplate from 'handlebars';

class Main {
  constructor() {
    this.init();
  }

  private init() {
    const memberId = this.getMemberIdFromQuery();
    if (memberId) {
      this.fetchMemberData(memberId);
    } else {
      console.error('No memberId found in URL query.');
    }
  }

  private getMemberIdFromQuery(): string | null {
    const params = new URLSearchParams(window.location.search);
    return params.get('memberId');
  }

  private async fetchMemberData(id: string) {
    const endpoint = `https://members-api.parliament.uk/api/Members/${id}`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      const data = await response.json();

      this.renderMember(data.value);
    } catch (error) {
      console.error('Error fetching member data:', error);
    }
  }

  private renderMember(member: MemberDataResponse) {
    const source = `<div class='wrapper'>
      <div class='image' style='background:#{{latestParty.backgroundColour}}'>
        <img src='{{thumbnailUrl}}' alt='{{nameDisplayAs}} image' />
      </div>
      <div class='information'>
        <p class='party'>{{latestParty.name}}</p>
        <p class='name'>{{nameDisplayAs}}</p>
        <p class='constituency'>{{latestHouseMembership.membershipFrom}}</p>
        {{#if latestHouseMembership.membershipEndDate}}
          <div class='isServing'>
            <p>No longer serving</p>
          </div>
        {{/if}}
      </div>
    </div>`;

    const template = HandlebarsTemplate.compile(source);
    const html = template(member);

    const root = document.getElementById('root');

    if (root) {
      root.innerHTML = html;
    }
  }
}

new Main();
