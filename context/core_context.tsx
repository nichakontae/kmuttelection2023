import _ from "lodash";
import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import axios from "../axios";

class CoreContext {
  step: number = 1;
  totalStep: number = 5;
  user = null;
  partyList = [];
  selectedParty: string = "";
  partyVote: number = -2;
  councilList = [];
  userImage = null
  token: null;
  apiPath: string = "https://election.kmutt.ac.th";
  submitting = false;

  constructor() {
    makeAutoObservable(this);
  }

  setValue = (name, value) => {
    this[name] = value;
  };

  prepareParty = async () => {
    try {
      const res = await axios.get("/api/party/", {
        headers: { Authorization: this.token },
      });
      if (res.status === 200) {
        this.partyList = res.data;
      }
    } catch (err) {
      console.log(err);
    }
  };
  prepareUserImage = async () => {
    try {
      const res = await axios.get(this.user.imagePath, {
        headers: { Authorization: this.token },
        responseType: "arraybuffer"
      },
      );
      if (res.status === 200) {
        const base64 = Buffer.from(new Int8Array(res.data)).toString('base64')
        this.userImage = base64
      }
    } catch (err) {
      console.log(err);
    }
  };

  prepareCouncil = async () => {
    try {
      const res = await axios.get("/api/council/", {
        headers: { Authorization: this.token },
      });
      if (res.status === 200) {
        this.councilList = _.map(
          _.filter(res.data, (item) => item.faculty === this.user.faculty),
          (item) => ({ ...item, vote: -2 })
        );
        // console.log(this.councilList);
        if (_.size(this.councilList) === 0) {
          this.totalStep = 3;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  postVoteResult = async () => {
    try {
      this.submitting = true;
      const body = {
        council: _.map(this.councilList, (item) => ({
          id: item.id,
          choice: item.vote,
        })),
        party: _.map(this.partyList, (item) => ({
          id: item.id,
          choice: this.partyVote,
        })),
      };
      const res = await axios.post("/api/vote/", body, {
        headers: { Authorization: this.token },
      });
      if (res.status === 200) {
        this.step = 7;
      }
    } catch (err) {
      console.log(err);
    } finally {
      this.submitting = false;
    }
  };

  setVote = (index: number, value: number) => {
    this.councilList[index].vote = value;
  };

  findParty = () => {
    return _.find(this.partyList, (item) => item.id == this.selectedParty);
  };

  stepUp = () => {
    this.step++;
  };

  stepDown = () => {
    this.step--;
  };
}

export const coreContext = createContext(new CoreContext());
