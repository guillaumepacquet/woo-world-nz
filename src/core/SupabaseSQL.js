import { Client } from "@/core/SupabaseClient";

const TABLE_NAME = "team";
class BaseRepository {
  constructor(supabase) {
    this.supabase = supabase;
  }

  async selectAll() {
    const { data, error } = await this.supabase.from(TABLE_NAME).select("*");

    this.handleErrors(error);

    if (data == null) {
      throw Error("Error inserting data: null returned");
    }

    return data;
  }

  async insert(object) {
    const { data, error } = await this.supabase
      .from(TABLE_NAME)
      .insert(object)
      .select("*");

    this.handleErrors(error);

    if (data == null) {
      throw Error("Error inserting data: null returned");
    }

    return data[0];
  }

  async update(object) {
    const { data, error } = await this.supabase
      .from(TABLE_NAME)
      .update(object)
      .select("*");

    this.handleErrors(error);

    if (data == null) {
      throw Error("Error inserting data: null returned");
    }

    return data[0];
  }

  async delete(id) {
    const { error } = await this.supabase
      .from(TABLE_NAME)
      .delete()
      .eq("id", id);

    this.handleErrors(error);

    return true;
  }

  handleErrors(error) {
    if (error) {
      throw new Error(error.message);
    }
  }
}
export default new BaseRepository(Client);
