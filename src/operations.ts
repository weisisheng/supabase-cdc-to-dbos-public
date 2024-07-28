import {
  TransactionContext,
  Transaction,
  GetApi,
  ArgSource,
  ArgSources,
  PostApi,
  HandlerContext,
  WorkflowContext,
  Workflow,
} from "@dbos-inc/dbos-sdk";
import { Knex } from "knex";

// The schema of the database table used in this example.
export interface event_catcher {
  event_payload: string;
}
//
export class EventCatcher {
  // data fetcher, use this in insomnia or postman to double check the data
  @GetApi("/getEventData")
  @Transaction()
  static async exampleGet(ctxt: TransactionContext<Knex>) {
    const { rows } = await ctxt.client.raw("SELECT * FROM event_catcher;");
    return rows;
  }
  /////////////////////////////////////////////////////
  // delete all rows, use this in insomnia or postman to double check the data
  @PostApi("/deleteEventData")
  @Transaction()
  static async deleteData(ctxt: TransactionContext<Knex>) {
    await ctxt.client.raw("DELETE FROM event_catcher;");
    return "deleted all data";
  }
  ///////////////////////////////////////////
  // archiving transaction
  @Transaction()
  static async archivingTransaction(
    ctxt: TransactionContext<Knex>,
    event_payload: string
  ) {
    const query = "INSERT INTO event_catcher (event_payload) VALUES (?);";
    const { rows } = (await ctxt.client.raw(query, [event_payload])) as {
      rows: event_catcher[];
    };
    return `This is the event from second function: ${rows}`;
  }

  // note: this is an ugly hack to obfuscate the api endpoint
  // only use for development purposes
  // swap out the url endpoint with your own randomly
  // generated one using the following:
  // openssl rand -base64 20
  // remove any equals sign character at the end
  //
  @PostApi("/OBstAqG6qOv7cWXCzzz")
  @Workflow()
  static async CDCWatcherArchiverWorkflow(ctxt: WorkflowContext) {
    // this is the event received from supabase
    ctxt.logger.info(
      `this is the ctxt request body: ${JSON.stringify(ctxt.request.body)}`
    );
    //
    const event_payload = JSON.stringify(ctxt.request.body);
    //
    await ctxt.invoke(EventCatcher).archivingTransaction(event_payload);
    ctxt.logger.info("Workflow completed");
    return event_payload;
  }
}
